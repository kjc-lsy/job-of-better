package site.dealim.jobconsulting.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    private long idx;
    private String username;
    private String password;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String gender;
    private String phone;
    private String address;
    private String profileImg;
    private Long comIdx;
    private String pgRegStatus;
    private Long pgIdx;
    private byte[] resumeFile;
    private LocalDateTime desiredInterviewDate;
    private LocalDateTime assignedInterviewDate;
    private String isInterviewDate = "N";
    private String interviewComment;
    private String isCoverLetter = "N";
    private String isResume = "N";
    private LocalDateTime joinDate = LocalDateTime.now();
    private LocalDateTime modifiedDate = LocalDateTime.now();
    private LocalDateTime withdrawnDate;
    private String isWithdrawn = "N";
    private List<MemberRole> roleList = new ArrayList<>();
}