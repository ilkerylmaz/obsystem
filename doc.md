# OBSystem — Öğrenci Bilgi Sistemi

**Versiyon:** 1.0.0 | **Tarih:** Şubat 2026

Üniversite öğrenci bilgi sistemi. Kayıt, ders yönetimi, not girişi ve akademik takip işlemlerini dijitalleştirir.

---

## İçindekiler

1. [Genel Bakış](#1-genel-bakış)
2. [Teknoloji Yığını](#2-teknoloji-yığını)
3. [Sistem Mimarisi](#3-sistem-mimarisi)
4. [Veritabanı Tasarımı (ER Diyagramı)](#4-veritabanı-tasarımı)
5. [Önyüz Rota Yapısı](#5-önyüz-rota-yapısı)
6. [Kimlik Doğrulama Akışı](#6-kimlik-doğrulama-akışı)
7. [Önyüz ↔ Arkayüz İletişimi](#7-önyüz--arkayüz-iletişimi)
8. [RBAC — Rol Tabanlı Erişim Kontrolü](#8-rbac)
9. [Not Hesaplama Mantığı](#9-not-hesaplama-mantığı)
10. [Docker Altyapısı](#10-docker-altyapısı)
11. [Proje Durumu](#11-proje-durumu)

---

## 1. Genel Bakış

OBSystem, üniversite süreçlerini yönetmek için geliştirilmiş bir web uygulamasıdır.

| Kullanıcı | Yetkiler |
|---|---|
| **Admin** | Kullanıcı, fakülte, bölüm, ders ve dönem yönetimi |
| **Öğretim Üyesi** | Kendi derslerinde not girişi, devamsızlık takibi |
| **Öğrenci** | Ders kaydı talebi, not görüntüleme, transkript |

---

## 2. Teknoloji Yığını

| Katman | Teknoloji | Versiyon |
|---|---|---|
| **Arkayüz** | Java + Spring Boot | 21 / 4.0.2 |
| **Veritabanı** | PostgreSQL + Flyway | 17.x |
| **Önyüz** | Next.js + TypeScript + Tailwind CSS | 14 |
| **Auth** | JWT (Stateless, RBAC) | — |
| **Konteyner** | Docker + Docker Compose | — |
| **ORM** | Hibernate / Spring Data JPA | — |
| **Migration** | Flyway | 11.x |

---

## 3. Sistem Mimarisi

```mermaid
graph TB
    subgraph Client["🌐 Tarayıcı"]
        UI["Next.js UI\n(Port 3000)"]
    end

    subgraph API["☕ Spring Boot API"]
        CTRL["Controller Layer\n/api/v1/**"]
        SVC["Service Layer"]
        REPO["Repository Layer"]
        SEC["Security Filter\n(JWT)"]
    end

    subgraph DB["🗄️ PostgreSQL"]
        PG["Database\n(Port 5432)"]
        FW["Flyway Migrations"]
    end

    UI -->|"HTTP/JSON\nBearer Token"| SEC
    SEC --> CTRL
    CTRL --> SVC
    SVC --> REPO
    REPO -->|"JPA/Hibernate"| PG
    FW -->|"V1__init.sql"| PG
```

### Katmanlı Mimari (Backend)

```mermaid
graph LR
    REQ["HTTP Request"] --> FILTER["JWT Filter"]
    FILTER --> CTRL["@RestController"]
    CTRL -->|"Request DTO"| SVC["@Service"]
    SVC -->|"Entity"| REPO["@Repository"]
    REPO -->|"SQL"| DB[("PostgreSQL")]
    DB --> REPO
    REPO -->|"Entity"| SVC
    SVC -->|"Response DTO"| CTRL
    CTRL --> RES["HTTP Response\n(JSON)"]
```

---

## 4. Veritabanı Tasarımı

### ER Diyagramı

```mermaid
erDiagram
    faculties {
        bigserial id PK
        varchar name UK
        timestamp created_at
        timestamp updated_at
    }

    departments {
        bigserial id PK
        bigint faculty_id FK
        varchar name
        timestamp created_at
        timestamp updated_at
    }

    users {
        bigserial id PK
        varchar username UK
        varchar password
        varchar email UK
        varchar role
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    teachers {
        bigint id PK_FK
        varchar fullname
        varchar title
        bigint department_id FK
        timestamp created_at
        timestamp updated_at
    }

    students {
        bigint id PK_FK
        varchar student_no UK
        bigint advisor_id FK
        varchar fullname
        varchar telephone
        bigint department_id FK
        integer enrollment_year
        smallint class_year
        timestamp created_at
        timestamp updated_at
    }

    semesters {
        bigserial id PK
        varchar semester_name
        date start_date
        date end_date
        date registration_start
        date registration_end
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    lessons {
        bigserial id PK
        varchar course_code UK
        varchar lesson_name
        smallint credit
        smallint ects
        varchar lesson_type
        bigint department_id FK
        timestamp created_at
        timestamp updated_at
    }

    teacher_lessons {
        bigserial id PK
        bigint teacher_id FK
        bigint lesson_id FK
        bigint semester_id FK
        varchar role
        boolean is_active
        integer quota
        timestamp created_at
        timestamp updated_at
    }

    enrollment_requests {
        bigserial id PK
        bigint student_id FK
        bigint teacher_lesson_id FK
        bigint semester_id FK
        varchar status
        bigint reviewed_by FK
        text review_note
        timestamp requested_at
        timestamp reviewed_at
    }

    grade_scale {
        bigserial id PK
        varchar letter UK
        decimal min_score
        decimal max_score
        decimal gpa_point
        boolean is_passing
    }

    notelist {
        bigserial id PK
        bigint student_id FK
        bigint teacher_lesson_id FK
        decimal midterm_note
        decimal final_note
        decimal makeup_exam
        decimal average
        varchar letter_grade FK
        varchar status
        integer absenteeism_count
        timestamp created_at
        timestamp updated_at
    }

    faculties ||--o{ departments : "içerir"
    departments ||--o{ teachers : "barındırır"
    departments ||--o{ students : "kayıtlıdır"
    departments ||--o{ lessons : "açar"
    users ||--o| teachers : "extends"
    users ||--o| students : "extends"
    teachers ||--o{ teacher_lessons : "verir"
    lessons ||--o{ teacher_lessons : "içinde"
    semesters ||--o{ teacher_lessons : "dönemde"
    teacher_lessons ||--o{ enrollment_requests : "için talep"
    teacher_lessons ||--o{ notelist : "not listesi"
    students ||--o{ enrollment_requests : "yapar"
    students ||--o{ notelist : "alır"
    teachers ||--o{ students : "danışman"
    grade_scale ||--o{ notelist : "harf notu"
    semesters ||--o{ enrollment_requests : "dönemde"
```

### Tablo İlişkileri Özeti

```mermaid
graph TD
    FAC["faculties\n(Fakülte)"] -->|1:N| DEP["departments\n(Bölüm)"]
    DEP -->|1:N| TCH["teachers\n(Öğretim Üyesi)"]
    DEP -->|1:N| STU["students\n(Öğrenci)"]
    DEP -->|1:N| LES["lessons\n(Ders)"]
    USR["users\n(Kullanıcı)"] -->|1:1| TCH
    USR -->|1:1| STU
    TCH -->|1:N| TL["teacher_lessons\n(Ders Açma)"]
    LES -->|1:N| TL
    SEM["semesters\n(Dönem)"] -->|1:N| TL
    TL -->|1:N| ER["enrollment_requests\n(Kayıt Talebi)"]
    TL -->|1:N| NL["notelist\n(Not Listesi)"]
    STU -->|1:N| ER
    STU -->|1:N| NL
    GS["grade_scale\n(Not Cetveli)"] -->|1:N| NL
```

---

## 5. Önyüz Rota Yapısı

```mermaid
graph TD
    ROOT["/"]
    ROOT --> LOGIN["/login"]
    ROOT --> ADMIN["/admin"]
    ROOT --> TEACHER["/teacher"]
    ROOT --> STUDENT["/student"]

    ADMIN --> AD["/admin/dashboard"]
    ADMIN --> AS["/admin/students"]
    ADMIN --> AT["/admin/teachers"]
    ADMIN --> AL["/admin/lessons"]

    TEACHER --> TD["/teacher/dashboard"]
    TEACHER --> TG["/teacher/grades"]

    STUDENT --> SD["/student/dashboard"]
    STUDENT --> SC["/student/courses"]
    STUDENT --> ST["/student/transcript"]

    style LOGIN fill:#f9f,stroke:#333
    style ADMIN fill:#bbf,stroke:#333
    style TEACHER fill:#bfb,stroke:#333
    style STUDENT fill:#fbf,stroke:#333
```

### Route Guard (middleware.ts)

```mermaid
flowchart TD
    A["İstek geldi"] --> B{"/login mi?"}
    B -->|Evet| Z["İzin ver ✓"]
    B -->|Hayır| C{"Cookie'de\ntoken var mı?"}
    C -->|Yok| R["/login'e yönlendir"]
    C -->|Var| D{"JWT geçerli\nmi?"}
    D -->|Hayır/Süresi geçmiş| R
    D -->|Evet| E{"Rol izinli\nmi?"}
    E -->|Hayır| R
    E -->|Evet| Z
```

---

## 6. Kimlik Doğrulama Akışı

```mermaid
sequenceDiagram
    actor U as Kullanıcı
    participant FE as Next.js Frontend
    participant BE as Spring Boot API
    participant DB as PostgreSQL

    U->>FE: Kullanıcı adı + Şifre gir
    FE->>BE: POST /api/v1/auth/login<br/>{ username, password }
    BE->>DB: SELECT * FROM users WHERE username = ?
    DB-->>BE: User kaydı (BCrypt hash)
    BE->>BE: BCrypt.verify(inputPassword, hash)
    alt Doğrulama başarılı
        BE->>BE: JWT oluştur<br/>{ sub: username, role: ADMIN/TEACHER/STUDENT, exp }
        BE-->>FE: 200 OK<br/>{ token, role, username }
        FE->>FE: localStorage.setItem("token", jwt)<br/>Cookie'ye yaz
        FE->>U: Role göre dashboard'a yönlendir
    else Doğrulama başarısız
        BE-->>FE: 401 Unauthorized
        FE->>U: Hata mesajı göster
    end
```

### JWT Token Yapısı

```mermaid
block-beta
    columns 3
    A["Header\nalgorithm: HS256\ntype: JWT"]:1
    B["Payload\nsub: username\nrole: ADMIN/TEACHER/STUDENT\nexp: timestamp\niat: timestamp"]:1
    C["Signature\nHMAC-SHA256(\nbase64(header)+'.'+base64(payload),\nJWT_SECRET\n)"]:1
```

---

## 7. Önyüz ↔ Arkayüz İletişimi

### API İletişim Katmanı (lib/api.ts)

```mermaid
graph LR
    PAGE["React Page/Component"] -->|"api.get/post/put/delete"| APICLIENT["lib/api.ts\n(Fetch Wrapper)"]
    APICLIENT -->|"Authorization: Bearer TOKEN\nContent-Type: application/json"| BACKEND["Spring Boot\n:8080"]
    BACKEND -->|"JSON Response"| APICLIENT
    APICLIENT -->|"Typed Response T"| PAGE
    LS["localStorage\n(token)"] -.->|"getItem('token')"| APICLIENT
```

### Uçtan Uca İstek Akışı

```mermaid
sequenceDiagram
    participant U as Kullanıcı
    participant COMP as React Component
    participant API as lib/api.ts
    participant MW as middleware.ts
    participant CTRL as @RestController
    participant SVC as @Service
    participant REPO as @Repository
    participant DB as PostgreSQL

    U->>COMP: Eylem (buton, form)
    COMP->>API: api.get('/api/v1/students')
    API->>API: token = localStorage.getItem('token')
    API->>MW: GET /api/v1/students<br/>Authorization: Bearer <token>
    MW->>MW: jwtVerify(token, JWT_SECRET)
    MW->>CTRL: İstek ilet
    CTRL->>SVC: studentService.getAll()
    SVC->>REPO: studentRepository.findAll()
    REPO->>DB: SELECT * FROM students
    DB-->>REPO: Rows
    REPO-->>SVC: List<Student> (Entity)
    SVC-->>CTRL: List<StudentResponseDto>
    CTRL-->>API: 200 OK JSON Array
    API-->>COMP: Student[]
    COMP->>U: UI güncelle
```

### Planlanan API Endpoint'leri

```mermaid
graph LR
    subgraph AUTH["🔐 Auth"]
        L["POST /api/v1/auth/login"]
        LO["POST /api/v1/auth/logout"]
    end

    subgraph ADMIN_API["👑 Admin Endpoints"]
        U1["GET    /api/v1/users"]
        U2["POST   /api/v1/users"]
        U3["PUT    /api/v1/users/{id}"]
        U4["DELETE /api/v1/users/{id}"]
        S1["GET    /api/v1/students"]
        S2["POST   /api/v1/students"]
        T1["GET    /api/v1/teachers"]
        T2["POST   /api/v1/teachers"]
        LE1["GET   /api/v1/lessons"]
        LE2["POST  /api/v1/lessons"]
        SM1["GET   /api/v1/semesters"]
        SM2["POST  /api/v1/semesters"]
    end

    subgraph TEACHER_API["📚 Teacher Endpoints"]
        TL1["GET  /api/v1/teacher/my-lessons"]
        TL2["GET  /api/v1/teacher/lessons/{id}/students"]
        N1["PUT  /api/v1/teacher/grades/{notelistId}"]
        ER1["GET  /api/v1/teacher/enrollment-requests"]
        ER2["PUT  /api/v1/teacher/enrollment-requests/{id}/approve"]
        ER3["PUT  /api/v1/teacher/enrollment-requests/{id}/reject"]
    end

    subgraph STUDENT_API["🎓 Student Endpoints"]
        SC1["GET  /api/v1/student/courses"]
        SC2["POST /api/v1/student/enrollment-requests"]
        TR1["GET  /api/v1/student/transcript"]
        GPA["GET  /api/v1/student/gpa"]
    end
```

### HTTP Durum Kodları

| Kod | Anlam | Kullanım |
|---|---|---|
| `200 OK` | Başarılı | GET, PUT yanıtları |
| `201 Created` | Oluşturuldu | POST yanıtları |
| `204 No Content` | İçerik yok | DELETE yanıtları |
| `400 Bad Request` | Geçersiz istek | Validation hatası |
| `401 Unauthorized` | Kimlik doğrulanamadı | Geçersiz/eksik token |
| `403 Forbidden` | Yetkisiz | Role uyumsuz erişim |
| `404 Not Found` | Bulunamadı | Kayıt mevcut değil |
| `409 Conflict` | Çakışma | Duplicate kayıt |
| `500 Internal Server Error` | Sunucu hatası | Beklenmedik hata |

---

## 8. RBAC

```mermaid
graph TD
    subgraph ROLES["Roller"]
        ADM["👑 ADMIN"]
        TCH["📚 TEACHER"]
        STU["🎓 STUDENT"]
    end

    subgraph PERMS["Yetkiler"]
        P1["Kullanıcı Yönetimi"]
        P2["Fakülte/Bölüm Yönetimi"]
        P3["Dönem Yönetimi"]
        P4["Ders Tanımlama"]
        P5["Öğretmene Ders Atama"]
        P6["Kendi Derslerini Görme"]
        P7["Not Girişi"]
        P8["Devamsızlık Girişi"]
        P9["Kayıt Taleb Onaylama"]
        P10["Ders Kaydı Talebi"]
        P11["Not Görüntüleme"]
        P12["Transkript Görüntüleme"]
    end

    ADM --> P1
    ADM --> P2
    ADM --> P3
    ADM --> P4
    ADM --> P5
    TCH --> P6
    TCH --> P7
    TCH --> P8
    TCH --> P9
    STU --> P10
    STU --> P11
    STU --> P12
```

---

## 9. Not Hesaplama Mantığı

### Otomatik Hesaplama (Veritabanı Trigger)

```mermaid
flowchart TD
    A["NOT GİRİŞİ\nmidterm_note / final_note / makeup_exam"] --> B["fn_calculate_average() Trigger\n(BEFORE INSERT OR UPDATE)"]
    B --> C{"makeup_exam\nNULL mı?"}
    C -->|Hayır - Büt var| D["effective_final = makeup_exam"]
    C -->|Evet - Normal sınav| E["effective_final = final_note"]
    D --> F{"Her iki not\ngirildi mi?"}
    E --> F
    F -->|Hayır| G["average = NULL"]
    F -->|Evet| H["average = midterm × 0.40\n+ effective_final × 0.60"]
    H --> I["grade_scale tablosundan\nharf notu ara\n(min_score ≤ average ≤ max_score)"]
    I --> J["letter_grade = AA/BA/BB..."]
    J --> K{"is_passing?"}
    K -->|Evet| L["status = 'PASSED' ✓"]
    K -->|Hayır| M["status = 'FAILED' ✗"]
```

### Not Cetveli

| Harf | Aralık | GPA | Durum |
|---|---|---|---|
| AA | 90.00 – 100.00 | 4.00 | ✅ Geçti |
| BA | 85.00 – 89.99 | 3.50 | ✅ Geçti |
| BB | 80.00 – 84.99 | 3.00 | ✅ Geçti |
| CB | 75.00 – 79.99 | 2.50 | ✅ Geçti |
| CC | 70.00 – 74.99 | 2.00 | ✅ Geçti |
| DC | 65.00 – 69.99 | 1.50 | ✅ Geçti |
| DD | 60.00 – 64.99 | 1.00 | ✅ Geçti |
| FD | 50.00 – 59.99 | 0.50 | ❌ Kaldı |
| FF | 0.00 – 49.99 | 0.00 | ❌ Kaldı |

### GPA Hesaplama (vw_student_gpa view)

$$GPA = \frac{\sum(\text{kredi} \times \text{gpa\_point})}{\sum(\text{kredi})}$$

---

## 10. Docker Altyapısı

```mermaid
graph TB
    subgraph DOCKER["Docker Network"]
        subgraph DB_C["db-container"]
            PG["PostgreSQL 17\n:5432"]
            VOL[("postgres_data\nvolume")]
            PG <--> VOL
        end

        subgraph API_C["api-container"]
            JVM["Spring Boot JVM\n:8080"]
        end

        subgraph WEB_C["web-container"]
            NODE["Next.js / Node.js\n:3000"]
        end
    end

    BROWSER["🌐 Tarayıcı"] -->|":3000"| NODE
    NODE -->|"http://api:8080\n(iç ağ)"| JVM
    JVM -->|"JDBC\ndb:5432"| PG

    API_C -.->|"depends_on"| DB_C
    WEB_C -.->|"depends_on"| API_C
```

### Servis Konfigürasyonu

| Servis | Image | Port | Ortam Değişkenleri |
|---|---|---|---|
| `db` | `postgres` (official) | `5432:5432` | `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` |
| `api` | `./backend` (Dockerfile) | `8080:8080` | `DB_HOST=db`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS` |
| `web` | `./frontend` (Dockerfile) | `3000:3000` | `NEXT_PUBLIC_API_URL=http://api:8080` |

---

## 11. Proje Durumu

```mermaid
gantt
    title OBSystem Geliştirme Durumu
    dateFormat YYYY-MM-DD
    section Veritabanı
        SQL Şeması (V1__init.sql)       :done, 2026-01-01, 2026-01-15
        Trigger & View                  :done, 2026-01-15, 2026-01-20
    section Arkayüz
        Spring Boot Kurulum             :done, 2026-01-20, 2026-01-25
        Security Config (geçici)        :done, 2026-02-18, 1d
        Entity Sınıfları                :active, 2026-02-19, 7d
        Repository Katmanı              :2026-02-26, 5d
        Service Katmanı                 :2026-03-03, 10d
        Controller / REST API           :2026-03-13, 10d
        JWT Security                    :2026-03-23, 7d
    section Önyüz
        Proje İskeleti & Routing        :done, 2026-01-25, 2026-02-10
        API Client & Auth               :done, 2026-02-10, 2026-02-15
        Login Sayfası                   :active, 2026-02-19, 5d
        Admin Panel                     :2026-03-01, 14d
        Teacher Panel                   :2026-03-15, 10d
        Student Panel                   :2026-03-25, 10d
    section Test & Deploy
        Unit Tests                      :2026-04-01, 7d
        Docker Compose Production       :2026-04-08, 5d
```

### Tamamlanan / Bekleyen Bileşenler

| Bileşen | Durum |
|---|---|
| ✅ Veritabanı şeması (SQL, trigger, view) | **Tamamlandı** |
| ✅ Docker Compose 3-konteyner kurulum | **Tamamlandı** |
| ✅ Frontend routing yapısı (Next.js App Router) | **Tamamlandı** |
| ✅ JWT middleware (route guard) | **Tamamlandı** |
| ✅ API istemci (`lib/api.ts`, `lib/auth.ts`) | **Tamamlandı** |
| ✅ TypeScript tip tanımları | **Tamamlandı** |
| ⚙️ Spring Boot güvenlik (geçici açık) | **Geçici** |
| ❌ JPA Entity sınıfları | **Bekliyor** |
| ❌ Repository katmanı | **Bekliyor** |
| ❌ Service katmanı | **Bekliyor** |
| ❌ REST Controller'lar | **Bekliyor** |
| ❌ JWT filtresi (Spring Security) | **Bekliyor** |
| ❌ Login sayfası (form + API entegrasyonu) | **Bekliyor** |
| ❌ Admin/Teacher/Student panel UI | **Bekliyor** |

dosya yapısı:
backend
src/main/java/com/obs/
├── config/              # Konfigürasyon sınıfları (Security, Swagger, ModelMapper)
├── controller/          # REST API Endpoints (Sadece istek karşılar)
├── service/             # İş mantığının kalbi (Interface + Impl)
│   ├── impl/            # Servis implementasyonları
│   └── rules/           # Özel iş kuralları (GradeCalculator, AttendanceChecker)
├── repository/          # Database erişimi (Spring Data JPA)
├── entity/              # Veritabanı modelleri (ER diyagramındaki tablolar)
├── dto/                 # Veri taşıma objeleri (Request/Response modelleri)
│   ├── request/         # Frontend'den gelen veriler
│   └── response/        # Frontend'e dönen veriler
├── mapper/              # Entity <-> DTO dönüşüm sınıfları (MapStruct)
├── exception/           # Custom exceptionlar ve GlobalExceptionHandler
├── security/            # JWT, UserDetails ve Auth filtreleri
└── util/                # Yardımcı sınıflar (Constants, DateUtils)




### Kendimden Notlar

# bu OBS sisteminde 3. haftam ve Token management alanında gelişmeler kaydediyorum

Şöyleki JWT token entegrasyonunu tamamladım sayılır, şuan token içine kullanıcı id'sini gömdüm
böylece id için ekstra upraş vermeden id bilgisine ulaşabileceğim.
Token'ı cookie içerisinde tutuyorum böylece XSS saldırılarına karşı önlem almış oluyorum, bu en
güvenli yöntem.
Ayrıca önyüz tarafında tokenları kullanmam gerektiği her seferde token ayıklamak ile uğraşmamak için
önyüzde bir hook oluşturdum ve singleton yapısını kullandım.