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
    private String name;
    private String username;
    private String password;
    private String email;
    private String address;
    private LocalDate birthDate;
    private String gender;
    private String phone;
    private Long comIdx;
    private Long pgIdx;
    private String pgRegStatus;
    private LocalDateTime pgRegDate;
    private String interviewStatus;
    private String coverLetterStatus;
    private String resumeStatus;
    private byte[] resumeFile;
    private LocalDateTime desiredInterviewDate;
    private LocalDateTime assignedInterviewDate;
    private String interviewComment;
    private LocalDateTime joinDate = LocalDateTime.now();
    private LocalDateTime modifiedDate = LocalDateTime.now();
    private LocalDateTime withdrawnDate;
    private String isWithdrawn = "N";
    private String profileImg;
    private List<MemberRole> roleList = new ArrayList<>();
}