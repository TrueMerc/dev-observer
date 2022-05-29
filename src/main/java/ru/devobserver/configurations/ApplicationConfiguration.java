package ru.devobserver.configurations;

import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationPropertiesScan("ru.devobserver.configurations")
public class ApplicationConfiguration extends WebMvcAutoConfiguration {
}
