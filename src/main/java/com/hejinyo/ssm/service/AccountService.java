package com.hejinyo.ssm.service;

import com.hejinyo.ssm.model.Account;

import java.util.List;

/**
 * Account service 接口
 */
public interface AccountService {
    public List<Account> getAllAccounts(Account account);
    public List<Account> getTest(String account);

}
