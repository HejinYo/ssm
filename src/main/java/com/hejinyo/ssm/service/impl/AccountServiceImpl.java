package com.hejinyo.ssm.service.impl;

import com.hejinyo.ssm.mapper.AccountMapper;
import com.hejinyo.ssm.model.Account;
import com.hejinyo.ssm.service.AccountService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Account Service 实现类
 */

@Service(value = "accountsService")
public class AccountServiceImpl implements AccountService {

    @Resource
    private AccountMapper accountMapper;

    @Override
    public List<Account> getAllAccounts(Account account) {
        return accountMapper.getAllAccounts(account);
    }

    @Override
    public List<Account> getTest(String account) {
        return accountMapper.getTest(account);
    }
}
