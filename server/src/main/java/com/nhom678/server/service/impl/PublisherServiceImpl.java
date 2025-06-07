package com.nhom678.server.service.impl;

import com.nhom678.server.dto.request.publisher.PublisherCreateRequest;
import com.nhom678.server.dto.request.publisher.PublisherUpdateRequest;
import com.nhom678.server.dto.response.PublisherResponse;
import com.nhom678.server.entity.Publisher;
import com.nhom678.server.exception.AppException;
import com.nhom678.server.enums.ErrorCode;
import com.nhom678.server.mapper.PublisherMapper;
import com.nhom678.server.repositories.PublisherRepository;
import com.nhom678.server.service.PublisherService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PublisherServiceImpl implements PublisherService {

    PublisherRepository publisherRepository;
    PublisherMapper publisherMapper;

    @Override
    public PublisherResponse createPublisher(PublisherCreateRequest request) {
        if(publisherRepository.existsPublisherByPublisherName(request.getPublisherName()))
            throw new AppException(ErrorCode.PUBLISHERNAME_EXISTED);
        Publisher publisher = publisherMapper.toPublisher(request);
        return publisherMapper.toPublisherResponse(publisherRepository.save(publisher));
    }

    @Override
    public PublisherResponse getPublisherById(Integer id) {
        return publisherMapper.toPublisherResponse(publisherRepository
                .findPublisherByPublisherId(id)
                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND)));
    }

    @Override
    public List<PublisherResponse> getAllPublisher() {
        return publisherRepository.findAll()
                .stream()
                .map(publisherMapper::toPublisherResponse).toList();
    }

    @Override
    @Transactional
    public void deletePublisherById(Integer id) {
        if (publisherRepository.findPublisherByPublisherId(id).isEmpty()) {
            throw new AppException(ErrorCode.PUBLISHER_NOT_FOUND);
        }
        publisherRepository.deletePublishersByPublisherId(id);
    }

    @Override
    public PublisherResponse updatePublisher(Integer publisherId, PublisherUpdateRequest request) {
        Publisher publisherUpdate = publisherRepository.findPublisherByPublisherId(publisherId)
                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_ID_NOT_FOUND));
        publisherMapper.updatePublisher(publisherUpdate, request);
        return publisherMapper.toPublisherResponse(publisherRepository.save(publisherUpdate));
    }
}
