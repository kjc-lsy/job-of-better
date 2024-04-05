package site.dealim.jobconsulting.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Company {
    private Long comIdx;
    private String comName;
    private String comCeoName;
    private String comAddress;
    private int comZipcode;
    private String comTel;
    private String comLogo;
    private Long comMemIdx;
    private String comLicenseNum;
    private String comLicenseFile;
    private LocalDate comOpeningDate;
    private LocalDateTime comJoinDate;
    private LocalDateTime comModifiedDate;
    private LocalDateTime comWithdrawDate;
    private String comIsWithdrawn;
}
