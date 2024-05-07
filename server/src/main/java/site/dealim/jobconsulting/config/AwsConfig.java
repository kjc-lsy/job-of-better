package site.dealim.jobconsulting.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import site.dealim.jobconsulting.prop.AwsProps;

@Configuration
@Slf4j
public class AwsConfig {
    @Autowired
    private AwsProps awsProps;

    @Bean
    public AmazonS3Client amazonS3Client(){
        log.info("amazonS3Client 빈 생성...");
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsProps.getAccessKey(), awsProps.getSecretKey());
        return (AmazonS3Client) AmazonS3ClientBuilder
                .standard()
                .withRegion(awsProps.getRegion()).enablePathStyleAccess()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
