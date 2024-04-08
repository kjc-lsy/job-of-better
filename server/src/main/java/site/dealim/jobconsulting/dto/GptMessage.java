package site.dealim.jobconsulting.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GptMessage {
    private String role;
    private String content;
}
