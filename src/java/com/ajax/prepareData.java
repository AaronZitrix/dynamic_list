/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajax;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author dze-prog10
 */
public class prepareData extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet prepareData</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet prepareData at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        PrintWriter out = response.getWriter();

        String connectionURL = "jdbc:derby://localhost:1527/dlist";
        Connection connection = null;
        ResultSet rs;

        response.setContentType("text/html");
        List dataList = new ArrayList();

        try {

            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(connectionURL, "", "");
            Statement s = connection.createStatement();
            String sql;
            
            // Создаем таблицу с данными в БД
            
            try {
                sql = "CREATE TABLE MAINTABLE (ID INTEGER NOT NULL primary key)";
                s.executeUpdate(sql);
                /*sql = "";
                for (int i = 1; i <= 1000; i++) {
                    sql += "INSERT INTO MAINTABLE VALUES (" + i + ");";
                }
                s.executeUpdate(sql);*/
                s.executeUpdate("INSERT INTO MAINTABLE VALUES (1)");
                
            } catch(SQLException e) {
                
            }
            
            // Выбираем данные из БД
            /*sql = "SELECT ID FROM APP.MAINTABLE";
            s.executeQuery(sql);
            rs = s.getResultSet();

            while (rs.next()) {
                // Сохраняем всё в список
                dataList.add(rs.getInt("id"));
                dataList.add(rs.getString("message"));
            }

            rs.close();*/
            s.close();
            
        } catch (Exception e) {

            System.out.println("Exception is: " + e);

        }
        
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
