
package site.dealim.jobconsulting.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.domain.Member;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberCompanyDto {
    private Member member;
    private Company company;
    private List<MultipartFile> file;
}