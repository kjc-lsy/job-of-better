package site.dealim.jobconsulting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.dealim.jobconsulting.domain.Member;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("SELECT m FROM Member m JOIN FETCH m.roleList WHERE m.memberId = :username")
    Optional<Member> findByMemberId(@Param("username") String username);
}
