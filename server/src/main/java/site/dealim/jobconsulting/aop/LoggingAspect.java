package site.dealim.jobconsulting.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

    @Before("execution(* site.dealim.jobconsulting.controller.*.*(..))")
    public void loggingController(JoinPoint joinPoint) {
        Signature signature = joinPoint.getSignature();
        log.info("class : " + signature.getDeclaringTypeName() + ", method : " + signature.getName());
    }
}
