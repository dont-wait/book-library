package com.nhom678.server.services.impl;

import com.nhom678.server.dto.ApiResponse;
import com.nhom678.server.dto.request.publisher.PublisherCreateRequest;
import com.nhom678.server.dto.request.publisher.PublisherUpdateRequest;
import com.nhom678.server.dto.response.PublisherResponse;
import com.nhom678.server.entity.Publisher;
import com.nhom678.server.exceptions.AppException;
import com.nhom678.server.exceptions.ErrorCode;
import com.nhom678.server.mapper.PublisherMapper;
import com.nhom678.server.repositories.PublisherRepository;
import com.nhom678.server.services.PublisherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class PublisherServiceImpl implements PublisherService {

    private final PublisherRepository publisherRepository;
    private final PublisherMapper publisherMapper;
    @Autowired
    public PublisherServiceImpl(PublisherRepository publisherRepository, PublisherMapper publisherMapper) {
        this.publisherRepository = publisherRepository;
        this.publisherMapper = publisherMapper;
    }

    @Override
    public PublisherResponse createPublisher(PublisherCreateRequest request) {
        if(publisherRepository.existsPublisherByPublisherName(request.getPublisherName()))
            throw new AppException(ErrorCode.PUBLISHERNAME_EXISTED);
        Publisher publisher = publisherMapper.toPublisher(request);
        return publisherMapper.toPublisherResponse(publisherRepository.save(publisher));
    }

//    @Override
//    public PublisherResponse updatePublisher(String publisherName, PublisherUpdateRequest request) {
//        Publisher publisher = publisherRepository.findPublisherByPublisherName(publisherName)
//                .orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND));
//        publisherMapper.updatePublisher(publisher, request);
//        return publisherMapper.toPublisherResponse(publisherRepository.save(publisher));
//    }

    @Override
    public PublisherResponse getPublisherByName(String publisherName) {
        return publisherMapper.toPublisherResponse(publisherRepository
                .findPublisherByPublisherName(publisherName)
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
    public void deletePublisher(String publisherName) {
        if (!publisherRepository.existsPublisherByPublisherName(publisherName)) {
            throw new AppException(ErrorCode.PUBLISHER_NOT_FOUND);
        }
        publisherRepository.deletePublishersByPublisherName(publisherName);
    }
}
