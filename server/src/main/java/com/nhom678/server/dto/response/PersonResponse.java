package com.nhom678.server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonResponse {
    String id;
    String firstName;
    String lastName;
    String email;
    String phone;
}
