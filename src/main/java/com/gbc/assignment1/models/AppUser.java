package com.gbc.assignment1.models;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class AppUser {
    @Id
    @Column(name="userId")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @ManyToMany(fetch=FetchType.EAGER)
    @Column(name="recipes")
    private Collection<Recipe> recipes = new ArrayList<>();
}
