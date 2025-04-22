package com.nhom678.server.dto.request.publisher;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublisherCreateRequest {

    @Size(min = 1, max = 10, message = "PUBLISHERID_EXISTED")
    int publisherId;

    @NotNull
    String publisherName;

    //Just create many book when Book Purchase Order
}
