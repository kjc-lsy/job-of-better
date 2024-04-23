package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.service.InterviewManagerService;

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

}
