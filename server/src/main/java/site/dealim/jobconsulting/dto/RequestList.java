package site.dealim.jobconsulting.dto;

import org.springframework.data.domain.Pageable;

public class RequestList<T>{
    private T data;
    private Pageable pageable;
}
