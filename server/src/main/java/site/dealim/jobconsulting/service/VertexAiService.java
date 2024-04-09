package site.dealim.jobconsulting.service;

import com.google.auth.oauth2.GoogleCredentials;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
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

    public String getSummary(String prompt) throws IOException, JSONException {
        return sendMsgOnTextBison(
                """
                교육 내용 : 
                교육 장소 : 
                교육 대상 : 
                
                다음 내용을 이 형식에 맞춰서 요약 해줘. 
                내용, 장소, 일시 전부 한줄로 요약해줘.
                전체 총합 글자수는 200자 이내로 해줘.
                각 카테고리는 markdown으로 bold 처리 해줘.
                
                %s
                
                """.formatted(prompt)
        );
    }

    /**
     * Send a message to Text Bison for prediction.
     *
     * @param  msg  the message to be sent for prediction
     * @return      the predicted content from Text Bison
     */
    public String sendMsgOnTextBison(String msg) throws IOException, JSONException {
        // 서비스 계정 키 파일 로드
        GoogleCredentials credentials = GoogleCredentials.fromStream(new ClassPathResource(vertexAiProps.getVertexAiKeyFilename()).getInputStream())
                .createScoped(Collections.singleton("https://www.googleapis.com/auth/cloud-platform"));
        credentials.refreshIfExpired();

        // REST 템플릿과 헤더 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + credentials.getAccessToken().getTokenValue());
        headers.setContentType(MediaType.APPLICATION_JSON);

        // JSON 객체로 요청 본문 구성
        JSONObject requestBodyJson = new JSONObject();
        JSONArray instancesArray = new JSONArray();
        JSONObject promptObject = new JSONObject();
        promptObject.put("prompt", msg);
        instancesArray.put(promptObject);
        requestBodyJson.put("instances", instancesArray);

        JSONObject parametersObject = new JSONObject();
        parametersObject.put("temperature", 1);
        parametersObject.put("maxOutputTokens", 300);
        parametersObject.put("topP", 0.5);
        parametersObject.put("topK", 1);
        requestBodyJson.put("parameters", parametersObject);

        String requestBody = requestBodyJson.toString();

        // HTTP 엔티티 생성
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // API 요청 및 응답
        ResponseEntity<VertexAiResponse> response = restTemplate.exchange(
                "https://us-central1-aiplatform.googleapis.com/v1/projects/job-of-better/locations/us-central1/publishers/google/models/text-bison:predict",
                HttpMethod.POST,
                requestEntity,
                VertexAiResponse.class);

        VertexAiResponse responseBody = response.getBody();

        return responseBody.getPredictions().get(0).getContent();
    }

    public String sendMsgOnGemini(String msg) throws IOException {
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
                    "contents": [
                        {
                            "role": "user",
                            "parts": [
                                {
                                    "text": "%s"
                                }
                            ]
                        }
                    ],
                    "generationConfig": {
                        "maxOutputTokens": 2048,
                        "temperature": 0.9,
                        "topP": 1
                    },
                    "safetySettings": [
                        {
                            "category": "HARM_CATEGORY_HATE_SPEECH",
                            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            "category": "HARM_CATEGORY_HARASSMENT",
                            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                }
                """.formatted(msg);


        // HTTP 엔티티 생성
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // API 요청 및 응답
        ResponseEntity<String> response = restTemplate.exchange(
                "https://asia-northeast3-aiplatform.googleapis.com/v1/projects/job-of-better/locations/asia-northeast3/publishers/google/models/gemini-1.0-pro-001:streamGenerateContent",
                HttpMethod.POST,
                entity,
                String.class);

        return response.getBody();
    }
}
