package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.service.InterviewManagerService;

import java.util.Map;

@RestController
@RequestMapping("/api/company/interview-manager")
@Slf4j
public class InterviewManagerController {
    private final InterviewManagerService interviewManagerService;

    public InterviewManagerController(InterviewManagerService interviewManagerService) {
        this.interviewManagerService = interviewManagerService;
    }

    @GetMapping("/get-occupied-slot")
    @Secured("ROLE_COMPANY")
    public ResponseEntity<?> getOccupiedSlot(@RequestParam(value = "pgIdx") Long pgIdx) {
        log.info("사용 중인 슬롯 조회...");
        return ResponseEntity.ok(interviewManagerService.getOccupiedSlotByPgIdx(pgIdx));
    }

    @PutMapping("/update-interview-status")
    @Secured("ROLE_COMPANY")
    public ResponseEntity<?> updateInterviewStatus(@RequestHeader("Content-Type") String contentType, @RequestBody Map<String, Object> reqBody) {
        log.info("사용자 면접 상태 수정... : " + contentType);

        Long memIdx = ((Number)reqBody.get("memIdx")).longValue();
        return ResponseEntity.ok(interviewManagerService.updateInterviewStatus(memIdx, (String)reqBody.get("status")));

    }

}
