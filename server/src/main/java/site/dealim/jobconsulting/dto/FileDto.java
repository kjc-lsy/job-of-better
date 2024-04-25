package site.dealim.jobconsulting.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.domain.File;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.Program;

@Data
@AllArgsConstructor
@Builder
public class FileDto {
    private File file;
    private Member member;
    private Program program;
    private Company company;
}
