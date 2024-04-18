package site.dealim.jobconsulting.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "MemberList API")
@RequestMapping("/api/company")
@Slf4j
public class MemberListController {

    @Autowired
    private MemberListService memberListService;

    @Secured("ROLE_COMPANY")
    @GetMapping("/get-filtered-members")
    public ResponseEntity<?> getFilteredMembers(
            Pageable pageable,
            @AuthenticationPrincipal CustomMember member,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "currPgIdx", required = false) Long currPgIdx,
            @RequestParam(value = "coverLetterFilter", required = false) String coverLetterFilter,
            @RequestParam(value = "resumeFilter", required = false) String resumeFilter,
            @RequestParam(value = "interviewFilter", required = false) String interviewFilter,
            @RequestParam(value = "regStatusFilter", required = false) String regStatusFilter) throws InterruptedException {

        log.info("멤버 필터링...");
        log.info("keyword : " + keyword + ", currPgIdx : " + currPgIdx + ", coverLetterFilter : " + coverLetterFilter + ", resumeFilter : " + resumeFilter + ", interviewFilter : " + interviewFilter + ", regStatusFilter : " + regStatusFilter);

        //TODO: 지울것
        Thread.sleep(1000);

        return ResponseEntity.ok(memberListService.getSearchedMembers(pageable, member.getMember().getIdx(), keyword, currPgIdx, coverLetterFilter, resumeFilter, interviewFilter, regStatusFilter));
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