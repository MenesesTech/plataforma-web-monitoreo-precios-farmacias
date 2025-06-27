package femt.sistema_precios.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "scraper.api")
@Validated
public class ScraperApiConfig {
    private String url;
}
