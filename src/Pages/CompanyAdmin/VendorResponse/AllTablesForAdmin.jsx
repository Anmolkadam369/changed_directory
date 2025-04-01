import React from "react";

const AllTablesForAdmin = ({ title, data }) => {
  // Check if `data` is not undefined or null and is an array
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
        <button
          style={{ backgroundColor: "teal", color: "white" }}
        >
          {title === "Accepted Vendors" ? "See Rejected Vendors" : "See Accepted Vendors"}
        </button>
      </div>
      <div className="responsive-table" style={{ width: "100%" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "90px" }}>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Vendor Name</th>
              <th>Type Of Vendor</th>
              <th>Vendor Email</th>
              <th>Vendor Decision</th>
              <th>Admin Decision</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {safeData.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", fontWeight: "bold" }}>
                  No response from the assigned vendors...
                </td>
              </tr>
            ) : (
              safeData.map((vendor, index) => (
                <tr key={vendor.vendorCode}>
                  <td>{index + 1}</td>
                  <td>{vendor.vendorName?.charAt(0).toUpperCase() + vendor.vendorName?.slice(1) || "---"}</td>
                  <td style={{ color: "green" }}>
                    {vendor.vendorType?.charAt(0).toUpperCase() + vendor.vendorType?.slice(1) || "---"}
                  </td>
                  <td style={{ color: "blue" }}>
                    <a href={`mailto:${vendor.email}`} style={{ color: "blue", textDecoration: "none" }}>
                      {vendor.email}
                    </a>
                  </td>
                  <td>
                    {vendor.vendorDecision
                      ? vendor.vendorDecision.charAt(0).toUpperCase() + vendor.vendorDecision.slice(1)
                      : "Pending"}
                  </td>
                  <td>
                    {vendor.adminDecision
                      ? vendor.adminDecision.charAt(0).toUpperCase() + vendor.adminDecision.slice(1)
                      : "Pending"}
                  </td>
                  <td>
                    <button
                      onClick={() => alert(`Viewing details for ${vendor.vendorName}`)}
                      className="view-button"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTablesForAdmin;
