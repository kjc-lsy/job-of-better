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
    private String comDetailAddr;
    private int comZipcode;
    private String comPhone;
    private String comLogo;
    private Long comMemIdx;
    private String comLicenseNum;
    private String comLicenseFile;
    private String comChargeName;
    private String comChargePhone;
    private String comEmail;
    private String comInfo;
    private LocalDate comOpeningDate;
    private LocalDateTime comJoinDate;
    private LocalDateTime comModifiedDate;
    private LocalDateTime comWithdrawDate;
    private String comIsWithdrawn;

}
