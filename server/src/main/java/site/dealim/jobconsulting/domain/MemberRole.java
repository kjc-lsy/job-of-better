package site.dealim.jobconsulting.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberRole {
    private long roleIdx;
    private String roleName;
    private String memberId;

    public MemberRole(String roleName, String memberId) {
        this.roleName = roleName;
        this.memberId = memberId;
    }
}
