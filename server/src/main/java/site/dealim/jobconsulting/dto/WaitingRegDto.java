package site.dealim.jobconsulting.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class WaitingRegDto {
    private String comName;
    private String comEmail;
    private String comPhone;
    private String pgTitle;
}
