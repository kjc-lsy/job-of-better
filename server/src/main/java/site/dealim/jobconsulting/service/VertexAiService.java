package site.dealim.jobconsulting.service;

import com.google.auth.oauth2.GoogleCredentials;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import site.dealim.jobconsulting.dto.VertexAiResponse;
import site.dealim.jobconsulting.prop.VertexAiProps;

import java.io.IOException;
import java.util.Collections;

@Service
@Slf4j
public class VertexAiService {
    @Autowired
    private VertexAiProps vertexAiProps;

    public String sendMsg(String msg) throws IOException {
        // 서비스 계정 키 파일 로드
        GoogleCredentials credentials = GoogleCredentials.fromStream(new ClassPathResource(vertexAiProps.getVertexAiKeyFilename()).getInputStream())
                .createScoped(Collections.singleton("https://www.googleapis.com/auth/cloud-platform"));
        credentials.refreshIfExpired();

        // REST 템플릿과 헤더 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + credentials.getAccessToken().getTokenValue());
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 본문 구성
        String requestBody = """
                {
                  "instances": [
                    { "prompt": "%s"}
                  ],
                  "parameters": {
                    "temperature": 1,
                    "maxOutputTokens": 300,
                    "topP": 0.5,
                    "topK": 1
                  }
                }
                """.formatted(msg);

        // HTTP 엔티티 생성
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // API 요청 및 응답
        ResponseEntity<VertexAiResponse> response = restTemplate.exchange(
                "https://us-central1-aiplatform.googleapis.com/v1/projects/job-of-better/locations/us-central1/publishers/google/models/text-bison:predict",
                HttpMethod.POST,
                entity,
                VertexAiResponse.class);

        VertexAiResponse responseBody = response.getBody();

        return responseBody.getPredictions().get(0).getContent();
    }
}
