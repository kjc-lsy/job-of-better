package site.dealim.jobconsulting.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class MemberRole {
    @Id
    @GeneratedValue
    private long roleIdx;
    private String roleName;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_idx")
    private Member member;

    public MemberRole(String roleName, Member member) {
        this.roleName = roleName;
        this.member = member;
    }
}
