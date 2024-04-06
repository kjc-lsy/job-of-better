package site.dealim.jobconsulting.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GptRequest {
    private String model;
    private List<GptMessage> messages;

    public GptRequest(String model, String prompt) {
        this.model = model;
        this.messages =  new ArrayList<>();
        this.messages.add(new GptMessage("user", prompt));
    }
}
