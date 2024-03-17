package site.dealim.jobconsulting.prop;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties("site.dealim.jobconsulting")
public class JwtProps {
    private String secretKey;
}
