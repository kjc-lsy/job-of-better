package site.dealim.jobconsulting.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import site.dealim.jobconsulting.security.jwt.provider.JwtTokenProvider;

@Configuration
@Slf4j
//@EnableSwagger2
public class SwaggerConfig {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    public OpenAPI api() {
        log.info("SwaggerConfig OpenAPI Bean 생성...");
        Info info = new Info()
                .version("v1.0.0")
                .title("JOB OF BETTER API")
                .description("API Controller Document");

        // SecuritySecheme명
        String jwtSchemeName = "jwtAuth";
        // API 요청헤더에 인증정보 포함
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName);
        // SecuritySchemes 등록
        Components components = new Components()
                .addSecuritySchemes(jwtSchemeName, new SecurityScheme()
                        .name(jwtSchemeName)
                        .type(SecurityScheme.Type.HTTP) // HTTP 방식
                        .scheme("bearer")
                        .bearerFormat("JWT")); // 토큰 형식을 지정하는 임의의 문자(Optional)

        return new OpenAPI()
                .info(info)
                .addSecurityItem(securityRequirement)
                .components(components);
    }
    @Bean
    public GroupedOpenApi getTotalApi() {
        return GroupedOpenApi
                .builder()
                .group("1. Total")
                .pathsToMatch("/api/**")
                .build();
    }
    @Bean
    public GroupedOpenApi getAuthApi() {
        return GroupedOpenApi
                .builder()
                .group("2. Auth")
                .pathsToMatch("/api/auth/**")
                .build();
    }

    @Bean
    public GroupedOpenApi getCompanyApi() {
        return GroupedOpenApi
                .builder()
                .group("3. Company")
                .pathsToMatch("/api/company/**")
                .build();
    }
    @Bean
    public GroupedOpenApi getMemberApi() {
        return GroupedOpenApi
                .builder()
                .group("4. User")
                .pathsToMatch("/api/user/**")
                .build();
    }

    /*@Bean
    public SecurityConfiguration security() {
        return new SecurityConfiguration(null, null, null, null,
                "Bearer " + jwtTokenProvider.createAdminToken(), ApiKeyVehicle.HEADER, "Authorization", "," *//* scope separator *//*);
    }*/
}