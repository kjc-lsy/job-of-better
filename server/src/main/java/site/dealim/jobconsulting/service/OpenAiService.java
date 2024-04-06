package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import site.dealim.jobconsulting.dto.GptRequest;
import site.dealim.jobconsulting.dto.GptResponse;
import site.dealim.jobconsulting.prop.OpenAiProps;

@Service
public class OpenAiService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private OpenAiProps openAiProps;

    public String sendMsg(String msg){
        GptRequest gptRequest = new GptRequest(openAiProps.getModel(), msg);
        GptResponse gptResponse = restTemplate.postForObject(openAiProps.getUrl(), gptRequest, GptResponse.class);
        return gptResponse.getChoices().get(0).getMessage().getContent();
    }

    public String getSummary(String prompt){
        return sendMsg(prompt + '\n' + "이거 세줄 요약 해줘. ~입니다 형식으로 대답해줘");
    }

}
