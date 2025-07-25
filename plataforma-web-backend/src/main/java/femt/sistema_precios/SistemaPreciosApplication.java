package femt.sistema_precios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

import femt.sistema_precios.config.ScraperApiConfig;

@SpringBootApplication
@EnableConfigurationProperties(ScraperApiConfig.class)
@EnableScheduling
public class SistemaPreciosApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaPreciosApplication.class, args);
	}

}
