/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ajax;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.json.*;

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
        
        //PrintWriter out = response.getWriter();

        int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
        int itemsPerPage = 10;
        int startPosition = (pageNumber - 1) * itemsPerPage;
        
        //String connectionURL = "jdbc:derby://localhost:1527/dlist [ on APP]";
        String connectionURL = "jdbc:mysql://195.46.191.142:3306/mysql?zeroDateTimeBehavior=convertToNull";
        Connection connection = null;
        ResultSet rs;
        
        //response.setContentType("text/html");
        //List dataList = new ArrayList();

        try {
            //Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(connectionURL, "AaronZ", "zx8471p");
            Statement s = connection.createStatement();
            String sql;
            
            // Создаем таблицу с данными в БД
            
            /*try {
                sql = "CREATE TABLE MAINTABLE (ID INTEGER NOT NULL primary key)";
                s.executeUpdate(sql);
                //sql = "";
                for (int i = 1; i <= 1000; i++) {
                    //sql += "INSERT INTO MAINTABLE VALUES (" + i + ");";
                    s.executeUpdate("INSERT INTO MAINTABLE VALUES (" + i + ")");
                }
                //s.executeUpdate(sql);
                //s.executeUpdate("INSERT INTO MAINTABLE VALUES (1)");
                
            } catch(SQLException e) {
                String a = "";
            }*/
            
            // Выбираем данные из БД
            
            sql = "SELECT ID FROM MAINTABLE LIMIT " + startPosition + "," + itemsPerPage;
            s.executeQuery(sql);
            rs = s.getResultSet();
            JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
            while (rs.next()) {
                jArrayBuilder.add(rs.getInt("id"));
            }
            String json_value = Json.createObjectBuilder()
                .add("items", jArrayBuilder)
                .build().toString();
            
            response.setContentType("application/json");
            response.setHeader("Cache-Control", "no-cache");
            response.getWriter().write(json_value);
            
            rs.close();
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
