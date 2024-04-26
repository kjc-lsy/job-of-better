package site.dealim.jobconsulting.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.dto.ProgramCompanyDto;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.AwsService;
import site.dealim.jobconsulting.service.MyInfoService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@Tag(name = "회원 - 마이페이지", description = "Member Info Controller")
@RequestMapping("/api/user/")
@Slf4j
public class MyInfoController {
    @Autowired
    MyInfoService myinfoService;
    @Autowired
    AwsService awsService;

    @Secured("ROLE_USER")
    @GetMapping("/user-profile-info")
    public Member userProfileInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("사용자 정보 불러오기");
        Member user = customMember.getMember();
        //System.out.println("myinfoService.userProfileInfo(user.getUsername() = " + myinfoService.userProfileInfo(user.getUsername()));
        return myinfoService.userProfileInfo(user.getUsername());
    }

    @Secured("ROLE_USER")
    @GetMapping("/pg-info")
    public ProgramCompanyDto pgInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("사용자 지정 프로그램 정보 불러오기");
        Member user = customMember.getMember();
        ProgramCompanyDto pgInfo = myinfoService.pgInfo(user.getPgIdx());
        //System.out.println("pgInfo = " + pgInfo);
        return pgInfo;
    }

    @Secured("ROLE_USER")
    @GetMapping("/cover-letter-info")
    public Map coverLetterInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("자소서 항목 불러오기");
        Member user = customMember.getMember();
        Map coverLetterInfo = new HashMap();
        coverLetterInfo.put("clList",myinfoService.coverLetterList(user.getIdx(),user.getPgIdx()));
        coverLetterInfo.put("clPercent",myinfoService.coverLetterInfo(user.getIdx(),user.getPgIdx()));
        return coverLetterInfo;
    }

    @Secured("ROLE_USER")
    @PostMapping("/register-interview")
    public ResponseEntity<?> registerInterview(
            @RequestParam("registeredInterviewDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime registeredInterviewDate,
            @AuthenticationPrincipal CustomMember customMember) {
        try {
            log.info("면접 신청 : registeredInterviewDate - " + registeredInterviewDate);
            Member user = customMember.getMember();
            myinfoService.registerInterview(registeredInterviewDate.withNano(0).withSecond(0), user.getIdx(), user.getPgIdx());

            return new ResponseEntity<>("면접 신청 성공", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Secured("ROLE_USER")
    @GetMapping("/get-current-occupancy")
    public ResponseEntity<?> getCurrentOccupancy(@AuthenticationPrincipal CustomMember customMember, @RequestParam("slotStartDatetime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime slotStartDatetime) {
        log.info("슬롯 점유 상태 확인 : slotStartDatetime = {}", slotStartDatetime);

        return new ResponseEntity<>(myinfoService.getCurrOccup(slotStartDatetime.withNano(0).withSecond(0), customMember.getMember().getPgIdx()), HttpStatus.OK);
    }


}
