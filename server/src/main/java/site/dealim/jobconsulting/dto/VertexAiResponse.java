package site.dealim.jobconsulting.dto;

import lombok.Data;

import java.util.List;

@Data
public class VertexAiResponse {
    private List<Prediction> predictions;
    private Metadata metadata;

    @Data
    public static class Prediction {
        private String content;
    }

    @Data
    public static class Metadata {
        private TokenMetadata tokenMetadata;

        @Data
        public static class TokenMetadata {
            private InputTokenCount inputTokenCount;
            private OutputTokenCount outputTokenCount;

            @Data
            public static class InputTokenCount {
                private int totalBillableCharacters;
                private int totalTokens;
            }

            @Data
            public static class OutputTokenCount {
                private int totalBillableCharacters;
                private int totalTokens;
            }
        }
    }
}
