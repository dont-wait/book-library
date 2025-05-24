package com.nhom678.server.dto.request.authen;

import lombok.*;
import lombok.experimental.FieldDefaults;

//Xac thuc token
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IntrospectRequest {
    String token;
}
