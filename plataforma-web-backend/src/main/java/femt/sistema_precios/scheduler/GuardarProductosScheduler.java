package femt.sistema_precios.scheduler;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import femt.sistema_precios.dto.ProductoRequestDTO;
import femt.sistema_precios.service.ProductoScrapingService;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@AllArgsConstructor
@Slf4j
public class GuardarProductosScheduler {

    private final ProductoScrapingService productoScrapingService;

    @Scheduled(cron = "0 0 * * * *") // Cada hora
    public void guardarProductosPeriodicamente() {
        // Establecer contexto de seguridad para el scheduler
        setSystemAuthentication();

        try {
            log.info("🔄 Iniciando scraping automático de productos...");
            List<ProductoRequestDTO> productos = productoScrapingService.solicitudProductosFlask();

            if (productos != null && !productos.isEmpty()) {
                productoScrapingService.registrarProducto(productos);
                log.info("✅ {} productos guardados automáticamente", productos.size());
            } else {
                log.warn("⚠️ No se encontraron productos para guardar");
            }
        } catch (Exception e) {
            log.error("❌ Error al guardar productos automáticamente: {}", e.getMessage(), e);
        } finally {
            // Limpiar contexto de seguridad
            SecurityContextHolder.clearContext();
        }
    }

    public void iniciarGuardar() {
        guardarProductosPeriodicamente();
    }

    private void setSystemAuthentication() {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken("system-scheduler", null,
                null);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}