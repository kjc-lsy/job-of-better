package site.dealim.jobconsulting.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@DynamicInsert // 속성의 값이 null 인경우 아예 insert 문을 만들지 않도록함. DB에 설정된 default 값을 null이 덮어 씌우기 때문에 설정함.
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberIdx;
    private String name;
    @Column(unique = true)
    private String memberId;
    private String password;
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberRole> roleList;
    private String email;
    private LocalDate birthDate;
    private String gender;
    @Column(unique = true)
    private String phone;
    private Integer comIdx;
    @Lob
    private byte[] resumeFile;
    private LocalDateTime desiredInterviewDate;
    private LocalDateTime assignedInterviewDate;
    private String isInterviewDate;
    private String interviewComment;
    private String isCoverLetter;
    private String isResume;
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime joinDate;
    @UpdateTimestamp
    private LocalDateTime modifiedDate;
    private LocalDateTime withdrawnDate;
    private String isWithdrawn;
}
