package com.nhom678.server.exception;

import com.nhom678.server.enums.ErrorCode;
import lombok.Data;

@Data
public class AppException extends RuntimeException {

    private ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
