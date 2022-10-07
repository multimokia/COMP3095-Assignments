package com.gbc.assignment1.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;


@Entity
@Table(name="users")
public class User {
    @Column(name="userId")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long _id;

    @Column(name="username")
    private String _username;

    @Column(name="password")
    private String _password;
}
