package site.dealim.jobconsulting.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import site.dealim.jobconsulting.prop.OpenAiProps;

@Configuration
@Slf4j
public class OpenAiConfig {
    @Autowired
    private OpenAiProps openAiProps;
    @Bean
    public RestTemplate openAiRestTemplate(){
        log.info("openAiRestTemplate 빈 생성...");
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("Authorization", "Bearer " + openAiProps.getOpenAiKey());
            return execution.execute(request, body);
        });
        return restTemplate;
    }
}
