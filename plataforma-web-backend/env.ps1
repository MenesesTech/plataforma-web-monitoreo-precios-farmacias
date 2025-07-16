# ==================================
#   CONFIGURACION DE BASE DE DATOS
# ==================================
$env:DB_URL = "jdbc:mysql://localhost:3306/preciofarma_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "1234"
$env:DB_DRIVER_CLASS = "com.mysql.cj.jdbc.Driver"

# ==================================
#   CONFIGURACION DE SPRING
# ==================================
$env:JWT_SECRET = "8d036945f381b78e904374f3536d514eecef63580f8dbd062ca51eb41bc65eef"
$env:JWT_EXPIRATION = "604800000"

# Api Key para administración
$env:ADMIN_API_KEY = "96rFZ8ff2a4oYzMna3uiL2"

# ==================================
#   CONFIGURACION DE SERVIDOR
# ==================================
$env:SERVER_PORT = "8080"
$env:DDL_AUTO = "update"

# ==================================
#   CONFIGURACION DE CORS
# ==================================
$env:CORS_ALLOWED_ORIGINS = "http://localhost:5173"

# ===================================
#       CONFIGURACION DE LOGGING
# ===================================
$env:SHOW_SQL = "false"

# ===================================
#   CONFIGURACION DE RATE LIMITING
# ===================================
$env:RATE_LIMIT_REQUESTS_PER_MINUTE = "60"
$env:RATE_LIMIT_BURST_SIZE = "10"

# ===================================
#   CONFIGURACION DE ENTORNO
# ===================================
$env:SPRING_PROFILES_ACTIVE = "dev"
$env:ENVIRONMENT = "dev"

# ===================================
#   CONFIGURACION DE FLASK APIS
# ===================================
$env:FLASK_API_URL_1 = "http://localhost:5000/api/ejecutar-scraping"
$env:FLASK_API_URL_2 = "http://localhost:5000/api/scraping/"