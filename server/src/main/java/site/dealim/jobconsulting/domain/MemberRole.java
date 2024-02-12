package site.dealim.jobconsulting.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberRole {
    private long roleIdx;
    private String roleName;
    private String username;

    public MemberRole(String roleName, String username) {
        this.roleName = roleName;
        this.username = username;
    }
}
