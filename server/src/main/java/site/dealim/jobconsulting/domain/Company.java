package site.dealim.jobconsulting.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Company {
    private Long comIdx;
    private String comName;
    private String comInfo;
    private String comEmail;
    private String comPhone;
    private String comAddress;
    private String comLogo;
    private String comChargeName;
    private String comChargePhone;
    private String comLicenseNum;
    private String comLicenseFile;
    private LocalDateTime comJoinDate;
    private LocalDateTime comModifiedDate;
    private LocalDateTime comWithdrawDate;
    private String comIsWithdrawn;
}
