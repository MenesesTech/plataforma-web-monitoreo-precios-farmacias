package femt.sistema_precios.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "scraper.api")
@Validated
public class ScraperApiConfig {
    @Value("${scraper.api.url1}")
    private String url1;
    @Value("${scraper.api.url2}")
    private String url2;
}
