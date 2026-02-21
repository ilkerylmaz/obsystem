-- ============================================================
--  OBS (Öğrenci Bilgi Sistemi) — Veritabanı Migration
--  Oluşturulma: 2026-02-18
-- ============================================================

-- ============================================================
-- BÖLÜM 0: updated_at otomatik güncelleme fonksiyonu
-- ============================================================
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- BÖLÜM 1: Fakülte & Bölüm Hiyerarşisi
-- ============================================================

CREATE TABLE faculties (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(150) UNIQUE NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
    id          BIGSERIAL PRIMARY KEY,
    faculty_id  BIGINT NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
    name        VARCHAR(150) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (faculty_id, name)
);

CREATE TRIGGER trg_faculties_updated_at
    BEFORE UPDATE ON faculties
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE TRIGGER trg_departments_updated_at
    BEFORE UPDATE ON departments
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ============================================================
-- BÖLÜM 2: Kullanıcılar & Roller
-- ============================================================

CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    username    VARCHAR(50)  UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    role        VARCHAR(20)  NOT NULL
                    CHECK (role IN ('ADMIN', 'TEACHER', 'STUDENT')),
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ============================================================
-- BÖLÜM 3: Dönemler (Semesters)
-- ============================================================

CREATE TABLE semesters (
    id                  BIGSERIAL PRIMARY KEY,
    semester_name       VARCHAR(50) NOT NULL,           -- örn: '2025-2026 FALL'
    start_date          DATE NOT NULL,
    end_date            DATE NOT NULL,
    registration_start  DATE NOT NULL,                  -- ders kayıt açılış tarihi
    registration_end    DATE NOT NULL,                  -- ders kayıt kapanış tarihi
    is_active           BOOLEAN DEFAULT false,          -- yalnızca 1 dönem aktif olmalı
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_semester_dates CHECK (start_date < end_date),
    CONSTRAINT chk_reg_dates     CHECK (registration_start < registration_end)
);

CREATE TRIGGER trg_semesters_updated_at
    BEFORE UPDATE ON semesters
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ============================================================
-- BÖLÜM 4: Öğretmenler
-- ============================================================

CREATE TABLE teachers (
    id            BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    fullname      VARCHAR(100) NOT NULL,
    title         VARCHAR(30),                          -- Dr., Prof. Dr., Arş. Gör. vb.
    department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_teachers_updated_at
    BEFORE UPDATE ON teachers
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ============================================================
-- BÖLÜM 5: Öğrenciler
-- ============================================================

CREATE TABLE students (
    id              BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    student_no      VARCHAR(20) UNIQUE NOT NULL,
    advisor_id      BIGINT REFERENCES teachers(id) ON DELETE SET NULL,
    fullname        VARCHAR(100) NOT NULL,
    telephone       VARCHAR(20),
    department_id   BIGINT REFERENCES departments(id) ON DELETE SET NULL,
    enrollment_year INTEGER NOT NULL,                   -- kayıt yılı, örn: 2023
    class_year      SMALLINT NOT NULL DEFAULT 1
                        CHECK (class_year BETWEEN 1 AND 6),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ============================================================
-- BÖLÜM 6: Dersler
-- ============================================================

CREATE TABLE lessons (
    id            BIGSERIAL PRIMARY KEY,
    course_code   VARCHAR(20) UNIQUE NOT NULL,
    lesson_name   VARCHAR(150) NOT NULL,
    credit        SMALLINT NOT NULL CHECK (credit > 0),   -- ulusal kredi
    ects          SMALLINT NOT NULL CHECK (ects > 0),      -- AKTS kredisi
    lesson_type   VARCHAR(10) NOT NULL DEFAULT 'REQUIRED'
                      CHECK (lesson_type IN ('REQUIRED', 'ELECTIVE')),
    department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_lessons_updated_at
    BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ============================================================
-- BÖLÜM 7: Harf Notu Skalası
-- ============================================================

CREATE TABLE grade_scale (
    id           BIGSERIAL PRIMARY KEY,
    letter       VARCHAR(5)     NOT NULL UNIQUE,  -- AA, BA, BB, CB, CC, DC, DD, FD, FF
    min_score    DECIMAL(5,2)   NOT NULL,
    max_score    DECIMAL(5,2)   NOT NULL,
    gpa_point    DECIMAL(3,2)   NOT NULL,          -- 4.00, 3.50, 3.00 vb.
    is_passing   BOOLEAN        NOT NULL DEFAULT true,
    CONSTRAINT chk_grade_range CHECK (min_score <= max_score)
);

-- Standart not skalası verileri
INSERT INTO grade_scale (letter, min_score, max_score, gpa_point, is_passing) VALUES
    ('AA',  90.00, 100.00, 4.00, true),
    ('BA',  85.00,  89.99, 3.50, true),
    ('BB',  80.00,  84.99, 3.00, true),
    ('CB',  75.00,  79.99, 2.50, true),
    ('CC',  70.00,  74.99, 2.00, true),
    ('DC',  65.00,  69.99, 1.50, true),
    ('DD',  60.00,  64.99, 1.00, true),
    ('FD',  50.00,  59.99, 0.50, false),
    ('FF',   0.00,  49.99, 0.00, false);

-- ============================================================
-- BÖLÜM 8: Ders Atamaları (Teacher Lessons / Sections)
-- ============================================================

CREATE TABLE teacher_lessons (
    id          BIGSERIAL PRIMARY KEY,
    teacher_id  BIGINT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    lesson_id   BIGINT NOT NULL REFERENCES lessons(id)  ON DELETE CASCADE,
    semester_id BIGINT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    role        VARCHAR(15) NOT NULL DEFAULT 'PRIMARY'
                    CHECK (role IN ('PRIMARY', 'ASSISTANT')),
    is_active   BOOLEAN DEFAULT true,
    quota       INTEGER CHECK (quota > 0),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (teacher_id, lesson_id, semester_id)
);

CREATE TRIGGER trg_teacher_lessons_updated_at
    BEFORE UPDATE ON teacher_lessons
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ============================================================
-- BÖLÜM 9: Ders Kayıt Talepleri (Enrollment Requests)
-- Danışman onay akışı
-- ============================================================

CREATE TABLE enrollment_requests (
    id               BIGSERIAL PRIMARY KEY,
    student_id       BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    teacher_lesson_id BIGINT NOT NULL REFERENCES teacher_lessons(id) ON DELETE CASCADE,
    semester_id      BIGINT NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    status           VARCHAR(10) NOT NULL DEFAULT 'PENDING'
                         CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    reviewed_by      BIGINT REFERENCES teachers(id) ON DELETE SET NULL,  -- danışman
    review_note      TEXT,                                                 -- red/onay açıklaması
    requested_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at      TIMESTAMP,
    UNIQUE (student_id, teacher_lesson_id)
);

-- ============================================================
-- BÖLÜM 10: Not Listesi (NoteList / Enrollments)
-- ============================================================

CREATE TABLE notelist (
    id                BIGSERIAL PRIMARY KEY,
    student_id        BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    teacher_lesson_id BIGINT NOT NULL REFERENCES teacher_lessons(id) ON DELETE CASCADE,
    midterm_note      DECIMAL(5,2) CHECK (midterm_note BETWEEN 0 AND 100),
    final_note        DECIMAL(5,2) CHECK (final_note   BETWEEN 0 AND 100),
    makeup_exam       DECIMAL(5,2) CHECK (makeup_exam  BETWEEN 0 AND 100),
    -- average: (midterm_note * 0.40) + COALESCE(makeup_exam, final_note) * 0.60
    -- Trigger veya uygulama katmanı tarafından hesaplanır
    average           DECIMAL(5,2) CHECK (average BETWEEN 0 AND 100),
    letter_grade      VARCHAR(5) REFERENCES grade_scale(letter),
    status            VARCHAR(10) NOT NULL DEFAULT 'ACTIVE'
                          CHECK (status IN ('ACTIVE', 'PASSED', 'FAILED', 'EXEMPT')),
    absenteeism_count INTEGER DEFAULT 0 CHECK (absenteeism_count >= 0),
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, teacher_lesson_id)
);

CREATE TRIGGER trg_notelist_updated_at
    BEFORE UPDATE ON notelist
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- Ortalama ve harf notunu otomatik hesaplayan trigger
CREATE OR REPLACE FUNCTION fn_calculate_average()
RETURNS TRIGGER AS $$
DECLARE
    v_effective_final DECIMAL(5,2);
    v_avg             DECIMAL(5,2);
    v_letter          VARCHAR(5);
BEGIN
    -- Büt varsa final yerine büt kullan
    v_effective_final := COALESCE(NEW.makeup_exam, NEW.final_note);

    IF NEW.midterm_note IS NOT NULL AND v_effective_final IS NOT NULL THEN
        v_avg := (NEW.midterm_note * 0.40) + (v_effective_final * 0.60);
        NEW.average := ROUND(v_avg, 2);

        -- Harf notunu grade_scale tablosundan bul
        SELECT letter INTO v_letter
        FROM grade_scale
        WHERE NEW.average BETWEEN min_score AND max_score
        LIMIT 1;

        NEW.letter_grade := v_letter;

        -- Durumu belirle
        SELECT
            CASE WHEN is_passing THEN 'PASSED' ELSE 'FAILED' END INTO NEW.status
        FROM grade_scale
        WHERE letter = v_letter;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notelist_calculate_average
    BEFORE INSERT OR UPDATE OF midterm_note, final_note, makeup_exam
    ON notelist
    FOR EACH ROW EXECUTE FUNCTION fn_calculate_average();

-- ============================================================
-- BÖLÜM 11: GPA Hesaplama View'ı
-- ============================================================

CREATE OR REPLACE VIEW vw_student_gpa AS
SELECT
    s.id                                            AS student_id,
    s.student_no,
    s.fullname,
    COUNT(n.id)                                     AS total_courses,
    SUM(l.credit)                                   AS total_credits,
    SUM(l.credit * gs.gpa_point)                    AS weighted_sum,
    CASE
        WHEN SUM(l.credit) > 0
        THEN ROUND(SUM(l.credit * gs.gpa_point) / SUM(l.credit), 2)
        ELSE 0
    END                                             AS gpa,
    sem.id                                          AS semester_id,
    sem.semester_name
FROM students s
JOIN notelist          n   ON n.student_id        = s.id
JOIN teacher_lessons   tl  ON tl.id               = n.teacher_lesson_id
JOIN lessons           l   ON l.id                = tl.lesson_id
JOIN semesters         sem ON sem.id              = tl.semester_id
JOIN grade_scale       gs  ON gs.letter           = n.letter_grade
WHERE n.status IN ('PASSED', 'FAILED')
GROUP BY s.id, s.student_no, s.fullname, sem.id, sem.semester_name;