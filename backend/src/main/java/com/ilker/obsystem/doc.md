1. Student (Öğrenci) Endpoints
GET /api/v1/student/courses: Öğrencinin aldığı dersleri listeler.

POST /api/v1/student/enrollment-requests: Yeni bir ders kayıt talebi oluşturur.

GET /api/v1/student/transcript: Öğrencinin transkriptini (not dökümünü) getirir.

GET /api/v1/student/gpa: Öğrencinin genel not ortalamasını hesaplar.

GET /api/v1/student/{id}/info : öğrencininin bilgilerini döner.

2. Teacher (Öğretmen) Endpoints
GET /api/v1/teacher/my-lessons: Hocanın verdiği dersleri listeler.

GET /api/v1/teacher/lessons/{id}/students: Belirli bir derse kayıtlı öğrencileri getirir.

PUT /api/v1/teacher/grades/{noteListId}: Öğrencinin notunu girer veya günceller.

GET /api/v1/teacher/enrollment-requests: Hocaya gelen ders kayıt onay taleplerini listeler.

PUT /api/v1/teacher/enrollment-requests/{id}/approve: Ders talebini onaylar.

PUT /api/v1/teacher/enrollment-requests/{id}/reject: Ders talebini reddeder.

3. Admin Endpoints
Admin tarafı tam bir CRUD (Create, Read, Update, Delete) merkezi olmuş:

Kullanıcı Yönetimi: GET, POST, PUT, DELETE /api/v1/users/...

Öğrenci/Hoca Yönetimi: /api/v1/students ve /api/v1/teachers için listeleme ve oluşturma.

Ders ve Dönem: /api/v1/lessons ve /api/v1/semesters için tanımlama endpointleri.

4. Auth (Kimlik Doğrulama)
   POST /api/v1/auth/login: Giriş yap ve token al.

POST /api/v1/auth/logout: Oturumu kapat.

💡 Mimari Tavsiyesi