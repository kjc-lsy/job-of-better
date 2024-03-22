package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.MemberCoverLetter;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/user-cover-letter-save")
    public ResponseEntity<Map<String, String>> userCoverLetterSave(@AuthenticationPrincipal CustomMember customMember, @RequestBody List<MemberCoverLetter> values) {
        Member user = customMember.getMember();
        userService.userCoverLetterSave(values, user.getIdx(), user.getComIdx());

        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("type", values.get(0).getMclIsConfirm()); // 클라이언트에서 받은 mclIsConfirm 값으로 설정
        responseMap.put("SUCCESS", "true"); // 성공 여부 설정

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    @GetMapping("user-cover-letter-info")
    public List<ComCoverLetter> userCoverLetterInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("자소서 항목 불러오기");
        Member user = customMember.getMember();
        return userService.userCoverLetterInfo(user.getComIdx());
    }
}
