package com.nhom678.server.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INVALID_ID_KEY(1001, "Invalid Message key, you should check your key"), //Sai sot trong dat viec dat Message tai DTO
    UNCATEGORIZED_EXCEPTION(6789, "Uncategorized Exception");

    private int code;
    private String message;
}
