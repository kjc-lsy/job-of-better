package site.dealim.jobconsulting.dto;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import site.dealim.jobconsulting.domain.Member;

import java.util.Collection;

@Data
public class CustomMember implements UserDetails {
    private Member member;

    public CustomMember(Member member) {
        this.member = member;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String[] userRoles = member.getRoleList()
                .stream()
                .map((role) -> role.getRoleName())
                .toArray(String[]::new);

        return AuthorityUtils.createAuthorityList(userRoles);
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getMemberId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
