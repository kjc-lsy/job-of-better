package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.MemberListService;

@RestController
@RequestMapping("/api/company")
@Slf4j
public class MemberListController {

    @Autowired
    private MemberListService memberListService;

    @Secured("ROLE_COMPANY")
    @GetMapping("/get-filtered-members")
    public ResponseEntity<?> getFilteredMembers(Pageable pageable, @RequestParam("keyword") String keyword, @AuthenticationPrincipal CustomMember member) {
        log.info("멤버 필터링... : " + keyword);
        return ResponseEntity.ok(memberListService.getSearchedMembers(pageable, member.getMember().getIdx(), keyword));
    }

    @Secured("ROLE_COMPANY")
    @GetMapping("/get-user-info/{idx}")
    public ResponseEntity<?> getUserInfo(@PathVariable("idx") Long idx) {
        log.info("USER 정보 가져오기...");
        return ResponseEntity.ok(memberListService.getMemberInfoByIdx(idx));
    }

    @Secured("ROLE_COMPANY")
    @PutMapping("/update-reg-status")
    public ResponseEntity<?> updateRegStatus(@RequestParam("memIdx") Long memIdx, @RequestParam("status") String status) {
        log.info("member 프로그램 신청 상태 업데이트...");
        if(memberListService.updateRegStatus(memIdx, status) == 1) {
            return ResponseEntity.ok("업데이트 성공");
        }
        return ResponseEntity.ok("업데이트 실패");
    }

}